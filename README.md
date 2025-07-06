# Next.js Project with `src` Folder Structure

This is a [Next.js](https://nextjs.org) project structured with a `src` directory, which contains the main parts of the application for better organization.

# Project Structure

```

src/
├── app/        # Pages and app-level components (Next.js 13+ app router)
├── assets/     # Static assets: images, fonts, styles, etc.
├── components/ # Reusable React components
├── stores/     # State management (MobX, Zustand, Redux, etc.)

```
---

## Getting Started

First, install dependencies if you haven't already:

```bash
npm install
# or
yarn install
# or
pnpm install
````

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

---

## Editing Your Application

* The main entrypoint is `src/app/page.tsx`.
* Add or modify components in the `src/components` folder.
* Place your static assets like images or fonts in the `src/assets` folder.
* Manage application state inside `src/stores`.

---

## Font Optimization

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load custom fonts.

---

## Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Next.js App Router](https://nextjs.org/docs/app)
* [Learn Next.js](https://nextjs.org/learn)

---

## Deployment

You can deploy this app easily on Vercel:

* [Deploy on Vercel](https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app)

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more information.

---

## Folder Naming

Using a `src` folder is an official recommended practice to keep source code organized and separated from config and scripts.

---

If you have any questions or want to contribute, feel free to open issues or pull requests!

---

*Happy coding!*