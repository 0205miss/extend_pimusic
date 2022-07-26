 public function  paywithPI(Request $request){
         
                 $user = Auth::user();
                
                
                 if($request->userid == $user->id) {
                    
                     $response = "You can't pay a product you own";
                     
                   return response(['data' => $response], 200);
                    
                 }else{
                     
                     
                     
                      if($request->action  == "approve")
            {
                
                $url = 'https://api.minepi.com/v2/payments/'.$request->paymentId.'/approve';
                $data = array();
                
            }else if($request->action == "complete")
            {
                
                
                $url = 'https://api.minepi.com/v2/payments/'.$request->paymentId.'/complete';
                $data = array('txid' => $request->txid);
                
            $transaction = Transaction::create([
            'user_id' => $user->id,
            'video_id' => $request->itemId['itemId'],
            'amount' => $request->amount,
            'txid' => $request->txid,
        ]);
        
        $saveupdate  = Video::where('id', $request->itemId['itemId'])->update(['status' => '1']);
        $saveupdate  = Video::where('id', $request->itemId['itemId'])->update(['owner' => $user->id]);
        
         // update to remove the producer beat from showing in the feed : this ought to be visible for the owner only.
        if($request->career === 'Producer'){
               
              $saveupdate  = Video::where('id', $request->itemId['itemId'])->update(['abuse_count' => '1']);
           }
           
                 
                 
            }else if($request->action == "incomplete"){
                 $paymentId = $request->paymentId['identifier'] ;
                 $amount = $request->paymentId['amount'] ;
                  $txid  = $request->paymentId['transaction']['txid'];
                  $itemid = $request->paymentId['metadata']['itemId'] ;
                   
                  
                $url = 'https://api.minepi.com/v2/payments/'.$paymentId.'/complete';
                $data = array('txid' => $txid);
                
            $transaction = Transaction::create([
            'user_id' =>  $user->id,
            'video_id' => $itemid,
            'amount' => $amount,
            'txid' => $txid,
        ]);
        
        $saveupdate  = Video::where('id', $itemid)->update(['status' => '1']);
        $saveupdate  = Video::where('id', $itemid)->update(['owner' => $user->id]);
        // update to remove the producer beat from showing in the feed : this ought to be visible for the owner only.
        if($request->career === 'Producer'){
               
              $saveupdate  = Video::where('id', $itemid)->update(['abuse_count' => '1']);
           }
        
             
            }
            $apps = array();
            $apps['auth_app1'] = 'Key go0nykhqeavvhmxdioofhgusjtogi830tq29cs9t3aa3ih7k1igm76wmxsa8l8so';
         
             $ch = curl_init($url);
             
            $postString = http_build_query($data, '', '&'); 

            $headers = array(
              "Authorization: " . $apps[$request->app_client],
            );
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          
            $response = curl_exec($ch);
            $error = curl_error($ch);
            curl_close($ch);
            

          
         return  response(['data' => $response], 200);
                     
                 }

       
        

     }