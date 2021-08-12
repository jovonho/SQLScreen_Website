$(document).ready(function () {


    $('#submit-btn').on('click', function (e) {
        e.preventDefault();

        activeTabContent = $($("ul#freq-tabs li.active a").attr('href'));
        data = {}

        data["title"] = $("#query-title").val();

        switch (activeTabContent.attr('id')) {
            case ("freq-daily-content"):
                data["frequency"] = "daily";
                data["runtime"] = $("#freq-daily-runtime").val()
                break;
            case ("freq-weekly-content"):
                data["frequency"] = "weekly";
                data["runtime"] = $("#freq-weekly-runtime").val()
                data["dayOfWeek"] = $("#freq-weekly-day-of-week").val()
                break;
            case ("freq-monthly-content"):
                data["frequency"] = "monthly";
                data["rundatetime"] = $("#freq-monthly-rundatetime").val()
                break;
            case ("freq-custom-content"):
                data["frequency"] = "custom";
                data["customRequest"] = $("#freq-custom-desc").val()
                break;
            default:
                break;

        }

        console.log(window.location.pathname)

        console.log(JSON.stringify(data))

        const request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        console.log("request: " + request.body)

        fetch(window.location.pathname, request).then((response) => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });


    });


})