export default function ConvertUpdatingPrices(updatingPrices) {
    return updatingPrices.map(function(updatingPrice){
        return {
            rowNumber: updatingPrice.row,
            CustOrgID: updatingPrice.orgId,
            OrgCode: updatingPrice.orgCode,
            OrgSubCode: updatingPrice.orgSubcode,
            QuoteID: updatingPrice.quoteId,
            RelationId: updatingPrice.relationId,
            TerminalId: updatingPrice.terminalId,
            CarrierOrgID: updatingPrice.carrierOrgId,
            Markup: updatingPrice.markup,
            Freight: updatingPrice.freight,
            TotalPrice: updatingPrice.totalPrice,
            EffectiveDate: updatingPrice.effectiveDatetime.replace(" ", "T"),
            IsTaxSelected: updatingPrice.isTaxSelected,
            ProductId: updatingPrice.productId,
            SupplierId: updatingPrice.suplierId,
            IsEmailNotificationSelected: updatingPrice.emailNotificationSelected,
            CustomerName: updatingPrice.orgName,
            ProductCode: updatingPrice.prodCode,
            TaxPrice: updatingPrice.taxes,
            emailid: updatingPrice.email,
            isSelected: updatingPrice.selected
        }
    })
};