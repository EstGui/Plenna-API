import CreateApp from "./app";

const app = CreateApp();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
