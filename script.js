function kirimPesan() {
    let inputField = document.getElementById("userInput");
    let chatBox = document.getElementById("chatBox");
    let userText = inputField.value.trim();

    if (userText === "") return;

    // Tampilkan pesan pengguna di layar
    chatBox.innerHTML += `<div class="user-msg"><b>Kamu:</b> ${userText}</div>`;
    inputField.value = ""; // Kosongkan input

    // Jalankan fungsi respons AI setelah jeda sedikit (seolah-olah berpikir)
    setTimeout(() => {
        let aiRespons = dapatkanResponsAI(userText);
        chatBox.innerHTML += `<div class="ai-msg"><b>AI:</b> ${aiRespons}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll ke bawah
    }, 500);
}

// Logika "Kecerdasan" AI sederhana berbasis kata kunci
function dapatkanResponsAI(pesan) {
    let pesanLower = pesan.toLowerCase();

    if (pesanLower.includes("halo") || pesanLower.includes("hai")) {
        return "Halo! Ada yang bisa saya bantu?";
    } else if (pesanLower.includes("siapa kamu") || pesanLower.includes("namamu")) {
        return "Saya adalah AI sederhana yang dibuat menggunakan HTML dan JavaScript.";
    } else if (pesanLower.includes("kabar") || pesanLower.includes("apa kabar")) {
        return "Saya hanyalah sebuah program, tapi saya berjalan dengan baik! Bagaimana denganmu?";
    } else if (pesanLower.includes("terima kasih") || pesanLower.includes("thanks")) {
        return "Sama-sama! Senang bisa membantu.";
    } else {
        return "Maaf, saya belum belajar tentang itu. Coba tanya hal lain!";
    }
}
