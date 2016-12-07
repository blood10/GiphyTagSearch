$(function() {
var tags;
var url;
var gifid;
$('#submit').click(function(e) {
        e.preventDefault()
        tags=$('#search_form').val();
        $('#gify').empty();
        load(tags);
    });

function load(tags)
    {
        $.ajax({
                url: "http://api.giphy.com/v1/gifs/search?q=" + trim(tags) +  "&api_key=dc6zaTOxFJmzC",
                type: "GET",
                success: function(response){
                    add(response);
                                           },
                error: function(){
                    $("<div class='alert_style'>Gif with such tags doesn't exist</div>").prependTo("#alert");
                    
                }
            });
    };
    
function trim(tags)
{
        return tags.replace(/ /g,"+");
}
    
function add(response)
{
        $('#alert').empty();
        if(response.data[0]==undefined)
        {
        $("<div class='alert_style'>Gif with such tags doesn't exist</div>").prependTo("#alert");
        }
        else {
            var trHTML;
            trHTML='';
                for (var i = 0; i < response.data.length; i++) {
                    url= response.data[i].images.original.url;
                    gifid = response.data[i].id;
                    thumbdisplay(gifid);
                    trHTML+='<div class="col-md-3 col-sm-6 col-xs-12">';
                    trHTML+='<div class="row">';
                    trHTML+='<div class="gif_container">';
                    trHTML+='<img class="gify" src="'+url+'"/></div>';
                    trHTML+='<div class="thumbs"><i class="fa fa-thumbs-o-up thumbup_img" aria-hidden="true" onclick="thumbup(\'' + gifid + '\');"><i class="thumbup '+gifid+'"></i></i><i class="fa fa-thumbs-o-down thumbdown_img" aria-hidden="true" onclick="thumbdown(\'' + gifid + '\');"><i class="thumbdown '+gifid+'"></i></i></div>';
                  trHTML+='<div class="divider"></div>';
                trHTML+='</div></div>';
                    $("#gify").append(trHTML);
                    trHTML='';
                }
        }
}

    
});
function thumbdisplay(id)
{
    $.post("php/thumbdisplay.php",
    { id: id},
    function(data) {
                if((data[0]) == '<')
                {
                    $('.thumbs').remove();
                }
                else
                {
                    data = $.parseJSON(data);
                    $('.thumbup.'+id).text(data[0].thumbup);
                    $('.thumbdown.'+id).text(data[0].thumbdown);
                }
                    }); 
}

function thumbup(id)
{
    $.post("php/thumbup.php",
    { id: id},
    function() {
        thumbdisplay(id);
                }); 
}

function thumbdown(id)
{
    $.post("php/thumbdown.php",
    { id: id},
    function() {
        thumbdisplay(id);
               }); 
}