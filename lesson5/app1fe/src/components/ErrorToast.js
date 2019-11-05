import { Position, Toaster, Intent } from "@blueprintjs/core";
 
/** Singleton toaster instance. Create separate instances for different options. */
export const ErrorToast = Toaster.create({
    icon: "ban-circle",
    intent: Intent.DANGER,
    position: Position.TOP,
});