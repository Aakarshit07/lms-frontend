# LMS Frontend

### Setup instruction

1. Clone the Project

```
    git clone https://github.com/Aakarshit07/lms-frontend.git
```
2. Move into the directory

```
    cd lms-frontend
```

3. install dependencies

```
    npm install
```

4. run the server

```
    npm run dev
```


### Setup instructions for  tailwind

[Tailwind official instruction Doc](https://tailwindcss.com/docs/installation)

1. Install Tailwind CSS

```
   npm install -D tailwindcss
```

2. Create configure file your template paths

```
    npx tailwindcss init
```

3. Add file extensions to tailwind Configure file in contens property

```
    "./src/**/*.{html,js, jsx, ts, tsx}"
```

4. Add the tailwind firectives at the top of the `index.css`

```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

### Adding plugins and dependencies

```
    npm install @reduxjs/toolkit react-redux  react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp 
```

### Configure auto import sort eslint

1. Install simple import sort

```
    npm install -D eslint-plugin-simple-import-sort
```

2. Add rule in `.eslint.cjs`

```
    "simple-import-sort/imports": "error"
```

3. Add simple-import sort plugin in `.eslint.cjs`

```
    plugins: [..., "simple-import-sort"]
```

4. To enable auto import sort on file save in vscode

    - Open `setting.json`
    - Add the following config
```
    'editor.codeActionsOnSave': {
        'source.fixAll.eslint': true
    }
```