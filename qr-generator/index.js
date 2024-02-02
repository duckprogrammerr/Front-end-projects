const backColorPicker = document.getElementById("back-color");
const frontColorPicker = document.getElementById("front-color");
const qrSizedropdown = document.getElementById("qr-sizes-dropdown");
const text = document.getElementById("text");
const qrcode = document.getElementById("qrcode");
const downloadBtn = document.getElementById("download-btn");
const shareBtn = document.getElementById("share-btn");

const settings = {
  backgroundColor: "#ffffff",
  frontColor: "#000000",
  selectedSize: 100,
  sizes: [100, 200, 300, 400, 500],
};

const generateQRcode = async () => {
  if (text.value.trim().length === 0 || text.value === null) return;
  qrcode.innerHTML = "";
  // create QRcode
  new QRCode(qrcode, {
    text: text.value,
    width: settings.selectedSize,
    height: settings.selectedSize,
    colorDark: settings.backgroundColor,
    colorLight: settings.frontColor,
    correctLevel: QRCode.CorrectLevel.H,
  });
  downloadBtn.href = await resolveDateUrl();
};


function resolveDateUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = document.querySelector("#qrcode img");
      if (img.currentSrc) {
        resolve(img.currentSrc);
        return;
      }
      const canvas = document.querySelector("canvas");
      resolve(canvas.toDataURL());
    }, 200);
  });
}
async function handleShare() {
  setTimeout(async () => {
    try {
      const base64url = await resolveDateUrl();
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], "QRCode.png", {
        type: blob.type,
      });
      await navigator.share({
        files: [file],
        title: text,
      });
    } catch (error) {
      alert("Your browser doesn't support sharing.");
    }
  }, 100);
}
backColorPicker.addEventListener("change", (e) => {
  settings.backgroundColor = e.target.value;
  generateQRcode();
});
frontColorPicker.addEventListener("change", (e) => {
  settings.frontColor = e.target.value;
  generateQRcode();
});
qrSizedropdown.addEventListener("change", (e) => {
  settings.selectedSize = e.target.value;
  generateQRcode();
});
text.addEventListener("input", (_) => generateQRcode());
shareBtn.addEventListener("click", handleShare);

window.onload = (e) => {
  // add sizes to the qr dropdown
  settings.sizes.forEach((e) => {
    let option = document.createElement("option");
    option.setAttribute("value", e);
    option.innerText = `${e}×${e}`;
    qrSizedropdown.appendChild(option);
  });
};
