$(document).ready(function() {
    
    // Set URL for API Docs
    let url_api_resource_files = "/api2/resources/files";
    let url_mys_api_docs = "/api-docs";

    let url_mys_domain = location.hostname;
    let url_faker_mys_api_domain = location.hostname;

    if (location.hostname === "localhost"){

        console.log("Domain is localhost");

        url_mys_domain = "http://localhost:3000";
        $('#iframe-api-docs').attr('src', url_mys_domain + "/api-docs");
        
        url_faker_mys_api_domain = "http://localhost:8080";
        url_api_resource_files = url_faker_mys_api_domain + "/api2/resources/files";
        
    }
    console.log("Mock YAML Server - Domain is: " + url_mys_domain);
    console.log("Faker MYS API - Domain is: " + url_faker_mys_api_domain);

    // Upload Resource File
    $("#btn_resource_file_upload").click(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        let resource_file_upload_url = "/api2/resources/upload";
        if (location.hostname === "localhost"){
            console.log("Domain is localhost #2");
            resource_file_upload_url = "http://localhost:8080/api2/resources/upload";
        }

        // Get form
        var form = $('#form_resource_upload')[0];

		// Create an FormData object 
        var data = new FormData(form);

		// If you want to add an extra field for the FormData
        //data.append("CustomField", "This is some extra data, testing");

		// disabled the submit button
        $("#btn_resource_file_upload").prop("disabled", true);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: resource_file_upload_url,
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {

                //$("#result").text(data);
                console.log("Resource File upload successful");
                $("#btn_resource_file_upload").prop("disabled", false);

            },
            error: function (e) {

                //$("#result").text(e.responseText);
                console.log("Resource File upload failed - Error : ", e);
                $("#btn_resource_file_upload").prop("disabled", false);

            }
        });

    });

    // Display the Resource File List
    $.getJSON(url_api_resource_files, function (data) {
        
        let file_list_html = '';

        console.log("File List: ", data);

        $.each(data, function (index, value) {
            file_list_html += `<a class="nav-link collapsed" href="#" style="color: #a7aeb8;">
                                    <i data-feather="file"></i>&nbsp;${value}
                                </a>`;
        });

        file_list_html = $.parseHTML(file_list_html);

        $("#div_file_list").html(file_list_html);

        // Activate Feather icons
        feather.replace();

    });

});