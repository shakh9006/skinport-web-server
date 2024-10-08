"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prisma_client_1 = require("./database/prisma.client");
const server_1 = __importDefault(require("./server"));
async function main() {
    const app = (0, server_1.default)();
    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => {
        return console.log(`Express server is listening at http://localhost:${PORT} 🚀`);
    });
}
main()
    .then(async () => {
    await prisma_client_1.prisma.$connect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma_client_1.prisma.$disconnect();
    process.exit(1);
});
