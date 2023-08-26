export function toast(title = '', message = '', type = 'info', duration = 3000){
    let toastList = document.getElementById('toast');
    if(toastList){
        const icons = {
            success : "fa-solid fa-circle-check",
            info :  "fa-solid fa-circle-info", 
            warning : "fa-solid fa-circle-exclamation",
            error : "fa-solid fa-triangle-exclamation"
        }
        var toastNode = document.createElement('div')

        let toastRemoveId = setTimeout(function(){
            toastList.removeChild(toastNode)
        }, duration + 1000)

        toastNode.onclick = function(e){
            if(e.target.closest('.toast__close')){
                toastList.removeChild(toastNode)
                clearTimeout(toastRemoveId)
            }
        }

        toastNode.classList.add('toast-custome', `toast--${type}`)
        toastNode.style.animation = `toastSlideIn ease 0.3s, fadeOut linear 1s ${duration/1000}s forwards`
        toastNode.innerHTML = `
            <div class="toast__icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">
                    ${title}
                </h3>
                <p class="toast__msg">
                    ${message}
                </p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-x"></i>
            </div>
        `
        toastList.appendChild(toastNode)             
    }
}
