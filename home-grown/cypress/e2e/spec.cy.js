describe("visits the home page and then navigates to the listings page", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.get('[href="/listings"] > li', { timeout: 10000 }).click();

    cy.url({ timeout: 10000 }).should(
      "be.equal",
      "http://localhost:3000/listings"
    );
    cy.get(".ListingContainer_card-container__ZcLXt", { timeout: 10000 });
    cy.get(".ListingContainer_input-bar__ZDahT")
      .type("strawberries")
      .get(".ListingContainer_search-button__IcPHz")
      .click();
    cy.get(".ListingContainer_card-container__ZcLXt > :nth-child(1)").contains(
      "Strawberries"
    );
  });
});

describe("visit listings page, searches by post-code and then clears search", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/listings").wait(1000);
    cy.get(".ListingContainer_input-bar__ZDahT")
      .type("M")
      .wait(1000)
      .get(".ListingContainer_search-button__IcPHz")
      .click()
      .wait(1000);
    cy.get(".ListingContainer_clear-button__jewrU").click();
  });
});

describe("visit homepage, navigates to log-in, inputs details. Then clicks forgot password", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/login").wait(1000);
    // cy.get("ul > :nth-child(4) > li").click().wait(1000);
    cy.get(".Login_form-email-input__3q0BK > .Login_input__r_1vS").type(
      "amina@gmail.com"
    );
    cy.get(".Login_form-password-input__XOMuN > .Login_input__r_1vS").type(
      "passrd"
    );
    cy.get(".Login_button__ejJ5H").click().get("h2").should("be.visible");
  });
});

describe("logged in user flow", () => {
  it("visit homepage, navigates to log-in, inputs details. and check if logs in", () => {
    // cy.session('login', ()=>{
    cy.visit("http://localhost:3000/login", { timeout: 10000 });
    // cy.get("ul > :nth-child(4) > li").click({ timeout: 10000 });
    cy.get('[data-cy="login-email-input"]').type("amina@gmail.com");
    cy.get('[data-cy="login-password-input"]').type("password");
    cy.get(".Login_button__ejJ5H").click({ timeout: 10000 });
    cy.url().should("be.equal", "http://localhost:3000/dashboard");
    // });
  });
  it("checking correct user data in dashboard", () => {
    cy.visit("http://localhost:3000/dashboard", { timeout: 10000 });
    cy.get(".DashboardContainer_title-user-name__wtPDy").contains("Amina");
    cy.get(
      ".DashboardContainer_profile-user-info__NJo7g > :nth-child(3)"
    ).contains("Location: TS26 8JA");
    cy.get(".CropTable_crop-table-container__2n_9F").contains(
      "White Mushrooms"
    );
  });
  it("Post page loads, displays relevant logged in user posts", () => {
    cy.visit("http://localhost:3000/post", { timeout: 10000 });
    cy.get(
      ":nth-child(1) > .Posts_post-card-header__wDYS1 > .Posts_post-card-header-title__qZpUW"
    ).should("contain", "Tomatoes");
    cy.get(
      ":nth-child(1) > .Posts_post-info__mXvMe > .Posts_location-crop-plot-banner__Jp6Iu > :nth-child(2)"
    ).should("contain", "Crop: Tomatoes");
  });
  it("Clicks edit button and inputs & buttons render", () => {
    cy.visit("http://localhost:3000/post", { timeout: 10000 });
    cy.get(
      ':nth-child(1) > .Posts_post-card-header__wDYS1 > .Posts_post-card-buttons__S8Dlz > [src="/icons/icons8-edit-26.png"]'
    ).click();
    cy.get('[src="icons/save.png"]').should("exist");
    cy.get(
      ":nth-child(1) > .Posts_post-info__mXvMe > .Posts_location-crop-plot-banner__Jp6Iu > .Posts_edit-crop-dropdown__h5E3_"
    )
      .select("Courgettes")
      .invoke("val")
      .should("eq", "7");
    //logs user out to reset for next tests
    cy.get('[href="/"] > li').click();
  });
});
