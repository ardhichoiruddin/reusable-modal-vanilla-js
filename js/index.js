class Modal{
    constructor(component){
        this.idComponent = component.id ? document.getElementById(component.id) : null;
        this.headerComponent = component?.header;
        this.bodyComponent = component?.body;
        this.footerComponent = component?.footer;
        this.body = document.getElementsByTagName("BODY")[0];
    };

    createButtonClose(){
        let button = document.createElement('button');
        button.className = 'modal__header__closeButton'
        button.setAttribute('aria-label',`modal close handle ${Math.random()}`)
        button.innerHTML =
            `   <svg width="10" height="10" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.1 27.3L0 25.2L11.55 13.65L0 2.1L2.1 0L13.65 11.55L25.2 0L27.3 2.1L15.75 13.65L27.3 25.2L25.2 27.3L13.65 15.75L2.1 27.3Z" fill="white">
                </svg>
            `
        ;
        button.onclick = () => this.closeModalHandler();
        return button;
    };

    closeModalHandler(){
        const bodyRemove = this.idComponent.querySelector('.modal');
        if(!bodyRemove) return;
        bodyRemove.remove();
        this.body.classList.remove("modal__bodyFrezee");
    }

    createWrapperModal({
        header,
        body,
        footer
    }){
        if(!this.idComponent) return;
        let divBox = document.createElement('div');
        let divModal = document.createElement('div');
        let divBackdrop = document.createElement('div');
        let divContainer = document.createElement('div');

        divBox.className = 'modal__box';
        divModal.className = 'modal';
        divContainer.className = 'container';
        divBackdrop.className = 'modal__backDrop';
        divBackdrop.onclick = () => this.closeModalHandler();

        divBox.appendChild(header);
        divBox.appendChild(body);
        divBox.appendChild(footer);

        divContainer.append(divBox);
        divModal.appendChild(divContainer);
        divModal.appendChild(divBackdrop);
        
        return this.idComponent.append(divModal);
    };

    createHeaderComponent(){
        if(!this.idComponent) return;
        let div = document.createElement('div');
        div.className = 'modal__header';
        div.innerHTML = this.headerComponent;
        div.append(this.createButtonClose());
        return div;
    };

    craateBodyComponent(){
        if(!this.idComponent) return;
        let div = document.createElement('div');
        div.className = 'modal__body';
        div.innerHTML = this.bodyComponent;
        return div;
    };

    createFooterComponent(){
        if(!this.idComponent) return;
        let div = document.createElement('div');
        div.className = 'modal__footer';
        div.innerHTML = this.footerComponent;
        return div;
    };

    pressEscToClose(){
        document.addEventListener('keydown', (e) => {
            const { isTrusted, code } = e;
            if(isTrusted && code === 'Escape') this.closeModalHandler();
        });
    };

    show(){
        this.createWrapperModal({
            header: this.createHeaderComponent(),
            body:  this.craateBodyComponent(),
            footer: this.createFooterComponent()
        });
        this.pressEscToClose();
        this.body.classList.add("modal__bodyFrezee");
    };

    close(){
        this.closeModalHandler();
    };
}