import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import dashboardRouter from "./dashboard";
import conversationsRouter from "./conversations";
import knowledgeRouter from "./knowledge";
import analyticsRouter from "./analytics";
import teamRouter from "./team";
import billingRouter from "./billing";
import notificationsRouter from "./notifications";
import aiSettingsRouter from "./ai_settings";
import integrationsRouter from "./integrations";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(dashboardRouter);
router.use(conversationsRouter);
router.use(knowledgeRouter);
router.use(analyticsRouter);
router.use(teamRouter);
router.use(billingRouter);
router.use(notificationsRouter);
router.use(aiSettingsRouter);
router.use(integrationsRouter);
router.use(contactRouter);

export default router;
