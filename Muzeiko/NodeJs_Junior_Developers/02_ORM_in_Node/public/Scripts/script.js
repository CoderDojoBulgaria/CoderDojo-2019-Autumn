window.onload = function () {
    // Четем първоначалния hash
    var currentPath = parent.location.hash;
    var dataValues = null;
    if (currentPath.length == 0) {
        currentPath = '#home';
    }

    // Създаваме функция за промяна на текущия hash
    // Скриваме всички div елементи (страници), които не завършват със селектирания hash
    function reloadPage() {
        parent.location.hash = currentPath;
        document.querySelectorAll('.page:not(' + currentPath + ')')
            .forEach(function (innerPage) {
                innerPage.style.display = 'none';
            });
        document.querySelector('input[name="prevUrl"]').value = currentPath;
        dbCall(currentPath);
    };

    // Извикваме функцията reloadPage при първото зареждане на страницата
    reloadPage();

    /*
        Закачаме по едно onclick събитие на бутоните в тагът nav
        Когато кликнем на някой от бутоните: 
            - променяме текущия currentPath
            - извикваме функцията reloadPage
            - променяме текущата страница да бъде видима
    */
    document.querySelectorAll('button')
        .forEach(function (innerButton) {
            innerButton.addEventListener('click', function (event) {
                currentPath = '#' + this.innerText.split('?')[0].toLowerCase();
                reloadPage();
                document.querySelector('.page' + currentPath).style.display = 'block';
            });
        });

    function addListeners() {
        document.querySelectorAll('button')
            .forEach(function (innerButton) {
                innerButton.removeEventListener('click', list);
                innerButton.addEventListener('click', list);
            });

        function list(event) {
            currentPath = '#' + this.innerText.split('?')[0].toLowerCase();
            if (this.innerText.split('?')[0].toLowerCase() == 'kittypaws_edit') {
                var currentLineId = this.innerText.split('?')[1].split('=')[1];
                var currentLine = dataValues.filter(function (obj) {
                    return obj.id == currentLineId;
                })[0];
                document.querySelector('#kittypaws_edit input[name="kittyId"]').value = currentLine.id;
                document.querySelector('#kittypaws_edit input[name="kittyName"]').value = currentLine.name;
                document.querySelector('#kittypaws_edit input[name="kittyBreed"]').value = currentLine.breed;
                document.querySelector('#kittypaws_edit input[name="kittyPrice"]').value = currentLine.price;
            }
            reloadPage();
            document.querySelector('.page' + currentPath).style.display = 'block';
        }
    }

    function dbCall(currentCall) {
        // Ajax request
        $.ajax({
            url: '/' + currentCall.substr(1),
            method: 'GET',
            data: null,
            dataType: 'json'
        }).then(function (respApp) {
            var innHTML = '';
            if (respApp.length > 0) {
                // Добавяме нашия резултат от изпратената заявка към глобалната променлива dataValues
                dataValues = respApp;

                for (var index = 0; index < respApp.length; index++) {
                    innHTML += '<tr>' +
                        '<td>' + respApp[index]['id'] + '</td>' +
                        '<td>' + respApp[index]['name'] + '</td>' +
                        '<td>' + respApp[index]['breed'] + '</td>' +
                        '<td>' + respApp[index]['price'] + '</td>' +
                        '<td>' + respApp[index]['create_user'] + '</td>' +
                        '<td>' + respApp[index]['last_update_user'] + '</td>' +
                        '<td>' + 
                            '<button>Kittypaws_Edit?id=' + respApp[index]['id'] + '</button>' + 
                        '</td>' +
                        '<td>' + 
                            '<form method="POST" action="/kittyDel"><input type="hidden" name="kittyId" value="' + respApp[index]['id'] + '"/><input type="submit" value="Delete" /></form>' +
                        '</td>' +
                        '</tr>';
                }
            }
            document.querySelector(currentPath + ' .tbody').innerHTML = innHTML;
            addListeners();
        });
    }

    // Променяме стойността на първия span елемент във footer-а на страницата на текущата година
    document.querySelector('footer span').textContent = new Date().getFullYear();
}