$(document).ready(() => {

  $('.link-dropdown').on('mouseover',function() {
    $(this).siblings().addClass('active')  
  })

  $('.link-dropdown').on('mouseleave',function() {
    $(this).siblings().removeClass('active')  
  })

})