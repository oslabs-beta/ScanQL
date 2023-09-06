describe("", ()=> {
    before("Render webpage", ()=> {
        cy.visit("/")
    })
    it("Should have about component", () => {
        cy.get("div").should("have.text", "About")
    })
})