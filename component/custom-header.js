class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
        .custom-header {
            background-color: #20665b; 
            color: #fff; 
            padding-block-end: 10px; 
            text-align: center;
            display: flex;
            width: 100%;
            
          }
        </style>
            <header class="custom-header">
                <div class="header-content">
                    <h1>Notes</h1>
                
                </div>
            </header>
        `;

        // Menambahkan CSS untuk tata letak
        this.style.display = 'flex'; // Menggunakan Flexbox
        this.style.alignItems = 'center'; // Pusatkan elemen secara vertikal
        this.style.width = '100%'; // Mengatur lebar elemen
        // Menambahkan CSS untuk header-content (agar elemen dapat diatur secara horizontal)
        const headerContent = this.querySelector('.header-content');
        headerContent.style.display = 'flex';
        headerContent.style.alignItems = 'center';
        
    }
}

customElements.define('custom-header', CustomHeader);