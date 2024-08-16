import { db } from "@/lib/db";

export const getAccountByUserIdDB = async (userId: string) => {
    try {
        const account = await db.account.findFirst({
            where: {
                userId,
            },
        });
        return account;
    } catch (error) {
        console.error(error);
        return null;
    }
};
