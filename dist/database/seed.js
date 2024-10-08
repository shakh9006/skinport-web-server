"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    let user = await prisma.user.findUnique({ where: { id: 1 } });
    if (!user) {
        await prisma.user.create({
            data: {
                balance: 10000,
            },
        });
        console.log("User with balance created successfully");
    }
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
