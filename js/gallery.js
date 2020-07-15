$form = $("<form>", {
    action: "#",
    method: "get"
});
$form.append(
    $("<input>", {
        type: "search",
        id: "search-input",
        class: "search-input",
        placeholder: "Search..."
    })
);
$form.append("<input type='submit' value='&#x1F50D;' id='search-submit' class='search-submit' />");
$(".search-container").append($form);
// AJAX to request multiple users (12 users) from randomuser.me/api
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function (data) {
        $.each(data.results, (index, user) => {
            data.results[index].id = index;
            $card = $("<div>", {
                class: "card"
            });
            $card_img = $("<div>", {
                class: "card-img-container"
            });
            $img = $("<img>", {
                class: "card-img",
                src: `${user.picture.medium}`,
                alt: "profile picture"
            });
            $card.on("click", () => {
                let date = new Date(user.dob.date);
                $(document.body).append(
                    $("<div>", { class: "modal-container" }).append(
                        $("<div>", { class: "modal" }).append([
                            $("<button>", {
                                type: "button",
                                id: "modal-close-btn",
                                class: "modal-close-btn",
                            }).append(
                                $("<strong>", {
                                    text: "X"
                                }).on("click", () => {
                                    $(".modal-container").hide();
                                })
                            ),
                            $("<div>", {
                                class: "modal-info-container"
                            }).append([
                                $("<img>", {
                                    class: "modal-img",
                                    src: `${user.picture.medium}`,
                                    alt: "profile picture"
                                }),
                                $("<h3>", {
                                    id: "name",
                                    class: "modal-name cap",
                                    text: `${user.name.title}. ${user.name.first} ${user.name.last}`
                                }),
                                $("<p>", {
                                    class: "modal-text",
                                    text: `${user.email}`
                                }),
                                $("<p>", {
                                    class: "modal-text cap",
                                    text: `${user.location.city}`
                                }),
                                $("<hr>"),
                                $("<p>", {
                                    class: "modal-text",
                                    text: `${user.phone}`
                                }),
                                $("<p>", {
                                    class: "modal-text",
                                    text: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}`
                                }),
                                $("<p>", {
                                    class: "modal-text",
                                    text: "Birthday: " + convertDate(user.dob.date)
                                })
                            ])
                        ])
                    )
                )
            });
            $card_img.append($img);
            $card.append($card_img);
            $card_info = $("<div>", {
                class: "card-info-container"
            });
            $card_info.append(
                $("<h3>", {
                    id: "name",
                    class: "card-name cap",
                    text: `${user.name.title}. ${user.name.first} ${user.name.last}`
                }),
                $("<p>", {
                    class: "card-text",
                    text: `${user.email}`
                }),
                $("<p>", {
                    class: "card-text cap",
                    text: `${user.location.city}, ${user.location.state}`  
                })
            );
            $card.append($card_info);
            $("#gallery").append($card);
        });
    }
});

$(document).keydown(function (event) {
    if (event.keyCode === 27) {
        $('.modal-container').hide();
    }
});

function convertDate(args) {
    date = new Date(args);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return year + '-' + month + '-' + dt;
}
