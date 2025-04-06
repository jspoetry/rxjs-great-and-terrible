// import { useState } from 'react'
// import { useObservable } from 'observable-hooks'

const [callState, setCallState] = useState(
  "call-awaiting"
);

const callDuration = useObservable(
  (callState$) => {
    const callStarted$ = callState$.pipe(
      //...
    );
    const callEnded$ = callState$.pipe(
      //...
    );
    const callDuration$ = callStarted$.pipe(
      // ...
    );

    return callDuration$;
  },
  [callState],
);