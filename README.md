# VetE-Commerce

![Logo VetE-Commerce](assets/icon.png)

Aplicación desarrollada como parte del curso **Desarrollo de Aplicaciones** de Coderhouse. Este proyecto simula una tienda veterinaria digital, permitiendo a los usuarios explorar productos, iniciar sesión, gestionar su carrito y realizar pedidos. Está orientado a dispositivos móviles y fue construido con **Expo SDK 53**.

---

## 🧭 Alcances del proyecto

Vet E-Commerce busca replicar una experiencia de compra sencilla y funcional para productos veterinarios. El foco está en:

- Autenticación de usuarios
- Persistencia de sesión local
- Navegación fluida entre pantallas
- Gestión de productos y pedidos
- Integración con Firebase para datos en tiempo real

---

## ✨ Features incluidos

- Registro e inicio de sesión con Firebase Authentication
- Persistencia de sesión con SQLite (y fallback con AsyncStorage)
- Visualización de productos desde Firebase Realtime Database
- Agregado y eliminación de productos en el carrito
- Confirmación de pedidos
- Navegación entre pantallas con React Navigation
- Manejo global del estado con Redux Toolkit
- Componentes reutilizables para inputs, botones y tarjetas

---

## 🧰 Tecnologías y librerías utilizadas

| Librería             | Uso principal                                                                 |
|----------------------|--------------------------------------------------------------------------------|
| **Expo SQLite**      | Persistencia local de sesión en dispositivos móviles                          |
| **AsyncStorage**     | Fallback para persistencia en entornos no compatibles con SQLite (como web)   |
| **Redux Toolkit**    | Manejo global del estado de la app y lógica de negocio                        |
| **RTK Query**        | Consumo eficiente de datos desde Firebase                                     |
| **Firebase**         | Autenticación de usuarios y base de datos en tiempo real                      |
| **Expo CLI**         | Entorno de desarrollo y ejecución multiplataforma                             |

---

## ⚙️ Requisitos previos

Antes de instalar y ejecutar la app, asegurate de tener:

- [Node.js](https://nodejs.org/) (versión 20 o superior recomendada)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente
- [Git](https://git-scm.com/) para clonar el repositorio


---

## 🚀 Instalación y puesta a punto

1. Cloná el repositorio:

```bash
git clone https://github.com/matof12/vet-ecommerce
cd ecommerce-vet
```

2. Instalá las dependencias:

```bash
npm install
```

3. Configurá las variables de entorno para Firebase

Creá un archivo `.env` en la raíz del proyecto con las variables

4. Iniciá la aplicación en modo desarrollo:

```bash
npx expo start
```

5. Abrí la app en un emulador Android/iOS o en tu celular con Expo Go

---

## 📦 Estructura del proyecto

```
/assets           → ícono
/components       → componentes reutilizables
/screens          → pantallas principales de la app
/storage            → configuración de Redux Toolkit y slices
/services         → lógica de Firebase y RTK Query
/db         → lógica de SQLite y persistencia local
```

---