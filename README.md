# Chat Uygulaması

Bu proje, kullanıcıların oturum açabildiği, arkadaş ekleyebildiği, sohbet edebildiği ve kullanıcıları engelleyebildiği bir chat uygulamasıdır.


## Özellikler

- **Kullanıcı Kaydı ve Girişi**: Firebase Authentication kullanılarak kullanıcı kaydı ve girişi.
- **Arkadaş Ekleme**: Kullanıcılar diğer kullanıcıları arkadaş olarak ekleyebilir.
- **Sohbet**: Arkadaşlar arasında gerçek zamanlı mesajlaşma.
- **Kullanıcı Engelleme**: Belirli kullanıcıları engelleme ve bu kullanıcıların mesajlarını görmeme.
- **Güzel Arayüz**: Material-UI (MUI) kullanılarak modern ve kullanıcı dostu arayüz.


## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzünü oluşturmak için.
- **Material-UI (MUI)**: Kullanıcı arayüzü bileşenleri ve stiller için.
- **Zustand**: Durum yönetimi için.
- **React-Hook-Form**: Form yönetimi ve doğrulama için.
- **Firebase**: Kimlik doğrulama ve gerçek zamanlı veritabanı için.

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu Klonlayın**
   
   ```bash
   git clone https://github.com/kullaniciadi/chat-uygulamasi.git
   cd chat-uygulamasi
3. **Gerekli Bağımlılıkları Yükleyin**

   ```bash
   npm install
4. **Firebase projenizi oluşturun ve firebaseConfig.js dosyasına yapılandırma bilgilerinizi ekleyin**
   
      ```bash
      // firebaseConfig.js
      const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
     };
    export default firebaseConfig;

6. **Projeyi Çalıştırın**
   
   ```bash
   npm run dev

