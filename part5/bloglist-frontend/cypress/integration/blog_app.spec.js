describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Richard Dang",
      username: "richarddang",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("login");
  });

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("richarddang");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("Richard Dang has logged in");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("richarddang");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();

      cy.get(".notification").should("contain", "wrong username or password");

      cy.get("html").should("not.contain", "Richard Dang has logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "richarddang", password: "password" });
    });

    it("a blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Title of Blog");
      cy.get("#author").type("Richard Dang");
      cy.get("#url").type("http://blog.com");
      cy.get("#create-button").click();
      cy.contains("a new blog Title of Blog by Richard Dang added");
      cy.contains("Title of Blog Richard Dang");
    });

    describe("and blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          author: "Richard Dang",
          title: "Title of Blog",
          url: "http://blog.com",
        });
        cy.createBlog({
          author: "Brad Pitt",
          title: "Title of Blog 2",
          url: "http://blog2.com",
          likes: 10,
        });
        cy.createBlog({
          author: "Samuel Jackson",
          title: "Title of Blog",
          url: "http://blog3.com",
          likes: 20,
        });
      });
      
      it("blogs are ordered in ascending order according to likes", function () {
        cy.get(".blog").then((blogs) => {
          let prev = Number.MAX_SAFE_INTEGER;
          for (var i = 0; i < blogs.length; i++) {
            cy.wrap(blogs[i]).contains("view").click();
            cy.wrap(blogs[i])
              .find(".likes")
              .then((e) => {
                const likes = parseInt(e.text());
                expect(prev).to.be.greaterThan(likes);
                prev = likes;
              });
          }
        });
      });

      it("a blog can be liked", function () {
        cy.contains("Title of Blog Richard Dang")
          .parent()
          .find("button")
          .click();
        cy.contains("like").click();
        cy.contains("like").click();
        cy.contains("likes 2");
      });
      it("a blog can be deleted by the user who created it", function () {
        cy.contains("Title of Blog Richard Dang")
          .parent()
          .find("button")
          .click();
        cy.contains("remove").click();
        cy.get("html").should("not.contain", "Title of Blog Richard Dang");
      });
    });
  });
});
