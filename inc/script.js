function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete"
        || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
        //console.log('1');
    } else {
        document.addEventListener("DOMContentLoaded", fn);

    }
}

docReady(function () {
    //var resultContainer = document.getElementById('qr-reader-results');
    var resultValueInputID = document.getElementById('qr-reader');
    if (typeof resultValueInputID !== "undefined" && resultValueInputID !== null) {
        var qrresult = resultValueInputID.dataset.qrresult;
        
        // This method will trigger user permissions
        Html5Qrcode.getCameras().then(devices => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
                var cameraId = devices[0].id;
                // .. use this to start scanning.
                //console.log(cameraId);
                //console.log(devices[0].label);
                // Create instance of the object. The only argument is the "id" of HTML element created above.
                const html5QrCode = new Html5Qrcode("qr-reader");

                html5QrCode.start(
                    { facingMode: "environment" },
                    //cameraId, // retreived in the previous step.
                    {
                        fps: 10,    // sets the framerate to 10 frame per second
                        qrbox: 250  // sets only 250 X 250 region of viewfinder to
                        // scannable, rest shaded.
                    },
                    qrCodeMessage => {
                        // do something when code is read. For example:
                        //console.log(`QR Code detected: ${qrCodeMessage}`);
                        var resultInput = document.getElementById(qrresult);
                        if (typeof resultInput !== "undefined" && resultInput !== null) {
                            resultInput.value = qrCodeMessage;
                        }
                    },
                    errorMessage => {
                        // parse error, ideally ignore it. For example:
                        //console.log(`QR Code no longer in front of camera.`);
                    })
                    .catch(err => {
                        // Start failed, handle it. For example,
                        console.log(`Unable to start scanning, error: ${err}`);
                    });
            }
        }).catch(err => {
            // handle err
        });
    }
});


