console.log("main.js loaded");

$('.article').on('click', function (e) {
    const id = $(this).data('id');
    const title = $(this).data('title');
    const description = $(this).data('description');
    const content = $(this).data('content');

    console.log({ id, title, description, content });
});

$('.modify').on('click', function () {
    $('#article-content').addClass('hidden');
    $('#form').removeClass('hidden');
});

$('.delete-form').on('click', function (e) {    
    const id = $(this).data('id');

    const confirmed = confirm("Es-tu sûr de vouloir supprimer cet article ?");
    if (confirmed) {

        $.post(`/delete/${id}`, function () {
            window.location.href = '/';
        });
    }
});