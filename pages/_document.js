import Document, { Head, Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        <link rel="shortcut icon" href="/robot-face.svg" />
        </Head>
        <body className="">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}