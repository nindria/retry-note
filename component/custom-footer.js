class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
        .custom-footer {
            background-color: #284b80; 
            color: #fff; 
            padding-block: 10px; 
            text-align: center; 
            position: relative; 
            bottom: 0; 
            width: 100%; 
          
          }
        </style>
            <footer class="custom-footer">
            <p>&copy 2024 Netania's Note</p>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);