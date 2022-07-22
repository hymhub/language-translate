export default {
    "hello":"こんにちは世界",
    rebateRatioTips: (type: string): string => {
        if (type === "Gold") {
          return "Oro: Promoción de 1er nivel alcanza";
        } else if (type === "Silver") {
          return "Plata: Promoción de 2ser nivel alcanza";
        } else {
          return "Bronce: No hay ningún requisito, puede obtenerlo al unirse";
        }
    },
    promotionTips: function (
        count: number | undefined,
        amount: number | undefined
      ): string {
        return `El registro llega a ${count || 0} personas y rebajas llegan USD ${amount || 0}`;
      },
    notRechargeDesc: (currency: string): string => `Los pagos de ${currency} no están respaldados actualmente en su región. Depósito con criptos, más rápidos y seguros.`,
}