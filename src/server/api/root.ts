import { createTRPCRouter } from "~/server/api/trpc";
import { reviewRouter } from "./routers/review";
import { imageRouter } from "./routers/image";
import { bookingRouter } from "./routers/booking";
import { userRouter } from "./routers/user";
import { serviceRouter } from "./routers/service";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    review: reviewRouter,
    image: imageRouter,
    booking: bookingRouter,
    user: userRouter,
    service: serviceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
