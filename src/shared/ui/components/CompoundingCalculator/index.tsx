'use client';

import Script from 'next/script';

export default function CompoundingCalculator() {
  return (
    <>
      <div id="compounding-calculator-770799" />

      <Script
        src="https://fxverify.com/Content/remote/remote-widgets.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-expect-error external widget
          window.RemoteCalc?.({
            Url: 'https://fxverify.com',
            TopPaneStyle:
              'YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCMzNDM1NDAgMCUsICMyNDI4MzEgMTAwJSk7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyLWJvdHRvbTogbm9uZTs=',
            BottomPaneStyle:
              'YmFja2dyb3VuZDogIzE1MTgxZDsgYm9yZGVyOiBzb2xpZCAwcHggIzJhMmUzOTsgY29sb3I6ICM5MTk0YTE7',
            ButtonStyle:
              'YmFja2dyb3VuZDogIzM0MzU0MDsgY29sb3I6IHdoaXRlOyBib3JkZXItcmFkaXVzOiAyMHB4Ow==',
            TitleStyle: 'dGV4dC1hbGlnbjogbGVmdDsgZm9udC1zaXplOiA0MHB4OyBmb250LXdlaWdodDogNTAwOw==',
            TextboxStyle:
              'YmFja2dyb3VuZDogIzE1MTgxZDsgY29sb3I6ICM5MTk0YTE7IGJvcmRlcjogc29saWQgMHB4ICM5MTk0YTE7',
            ContainerWidth: '665',
            HighlightColor: 'rgba(0,0,0,1.0)',
            IsDisplayTitle: false,
            IsShowEmbedButton: true,
            CompactType: 'large',
            Calculator: 'compounding-calculator',
            ContainerId: 'compounding-calculator-770799',
          });
        }}
      />
    </>
  );
}
