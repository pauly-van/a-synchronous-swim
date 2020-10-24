(function () {
  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

  const ajaxGet = (sucessCB) => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (data) => {
        console.log(data);
        if (data) {
          SwimTeam.move(data);
          ajaxGet();
        }
        // ajaxGet();
      },
      error: () => {
        console.log('ERROR');
      },
    });
  };
  ajaxGet();
  /////////////////////////////////////////////////////////////////////
  // The ajax file uploader is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        // setTimeout(() => {
        window.location = window.location.href;
        // }, 2000);
      },
    });
  };

  $('form').on('submit', function (e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });
})();
