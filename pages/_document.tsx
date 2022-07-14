import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
    render() {
        return (
            <Html style={{ height: "100%" }}>
                <script src="https://sdk.minepi.com/pi-sdk.js"></script>
                <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>

                <Head></Head>
                <body className="carbg" style={{ height: "100%" }}>
                    <Main />
                </body>
                <NextScript />
            </Html>

        )
    }
}
