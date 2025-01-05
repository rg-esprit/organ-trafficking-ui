/**
 * Sends a message to the FiveM Lua client side
 * @param eventName - Name of the event to trigger in Lua
 * @param data - Data to send to Lua
 */
export async function sendToClient<T = any>(
  eventName: string,
  data: any = {}
): Promise<T> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  const resourceName =
    (window as any).GetParentResourceName?.() ?? "RG-organ-trafficking";
  const resp = await fetch(`https://${resourceName}/${eventName}`, options);
  return await resp.json();
}

/**
 * Listens for messages from the FiveM Lua client side
 * @param actionName - Name of the action to listen for
 * @param callback - Function to run when message is received
 */
export function onMessage<T = any>(
  actionName: string,
  callback: (data: T) => void
): () => void {
  const eventListener = (event: MessageEvent) => {
    const { action, data } = event.data;
    if (action === actionName) {
      callback(data);
    }
  };

  window.addEventListener("message", eventListener);

  // Return cleanup function
  return () => window.removeEventListener("message", eventListener);
}
