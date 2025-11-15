const { readFileSync } = require("fs");
const {
  iterationUn,
  iterationDeux,
  iterationTrois,
  iterationQuatre,
  allSettled,
  introduceHenri,
} = require("./index");
const { resolve } = require("path");
const { expect } = require("chai");

describe("javascript", () => {
  describe("Iteration des tableaux", () => {
    let dataSet;
    const resultExpected = [
      "55b8a5db-f245-45bb-8913-da0168619bc4",
      "d7e437bb-8599-48af-a590-029d6682cad9",
      "ff625d5a-2246-4af0-bee2-b57d5a72def5",
      "fd57e60a-10c4-48d0-871a-e37b91f4c4cc",
      "7763ef32-2cee-4d8b-8174-16613fe88467",
      "2e72c24f-3b52-4808-b7b7-069162177c78",
      "04c09ac3-38f5-4fdf-b091-b52d83dce534",
      "9cbe7edc-ec35-40a2-88e5-f1a1e3c62493",
      "7e70f697-d73f-4383-8340-2c0cc014796f",
      "37a0318b-0b45-4efa-8bc6-c45884d5e767",
      "a9f862c1-bfb1-48e0-be8f-bcff3b02c3b3",
      "a9c4bebb-7d25-4d38-8c7b-33a8d7d2d360",
      "f7e7eb3f-aab0-4c5e-867f-68b06ce736e1",
      "8ae5d5fa-086d-4f0c-8404-a114f2c8ee87",
      "eb60770d-c162-49be-9d52-b462bf63ec0f",
      "33ac5e01-de70-4a38-81f7-06bd56b4fd23",
      "b0825d04-4e4f-4c0f-8a01-cacadfe72eee",
      "e92bc411-fd6b-43f1-94c8-6b4dc9eb97a0",
      "7cc7380b-834e-43c9-88bf-4e4e3926e997",
      "d247db9e-3acf-426b-bb0a-02baa6d35763",
      "256b07d4-6305-47fa-9957-0dc814d037fe",
      "7e4e78f3-544d-42e4-b094-1a6595fc581e",
      "f0107de3-a880-449c-a96a-a280e1700cdb",
      "49820658-4f92-4538-810a-6c63f9aa79f2",
      "85e80b5c-f455-4d7e-bbc1-306a987f5803",
      "18aea9f3-4353-44fe-988a-26a3c38e62ea",
      "34a5c2d3-e9f3-4f3d-ae56-0d91c8d7ca96",
      "ff41707a-5977-4c87-8e91-10e1f5db3076",
      "84c73e07-4df9-465c-bb5a-62934a720ddf",
      "ef4867ef-a363-4c55-a84b-d09455d86ff4",
      "d47a2205-fe22-4772-a9e0-c0282e1275c7",
      "2b573815-67c1-45d6-9cff-a78233f206c1",
      "7ece3965-c411-47e7-a766-fa3de4fd5d58",
      "e04e38d2-ea00-4952-ad99-ae0a15304f90",
      "513e5480-0df6-4549-a75d-3206fd1628e9",
      "d9603f18-7f1f-4f4c-89b3-d4d93ad1522f",
      "3cf5aeaa-fd77-4428-8a32-63ede0443d28",
      "99044e84-f1d5-4924-97d7-d09fa514db2f",
      "b29a7e08-1356-45df-b65e-9965fbc6e699",
      "8c60ad13-37f4-49e2-a2e3-8a3ee75b0728",
      "12f7f14a-dc44-4321-9b3f-dc65db7758af",
      "b32bcf25-ac0c-48a0-b913-95d00eadaa9a",
      "3f959fa1-243f-4bf7-9032-aa2bce95ee5c",
      "973b62d8-c1c5-494b-a495-ac5c546a8ba9",
      "eac9434e-41ac-4fa7-9762-e908a7b09f2f",
      "6f798c00-d236-4fe2-b39e-5701e188d48b",
      "ea41ad86-39a3-4d98-8b13-6fd9cf7d241d",
      "5baa7adb-87d4-4c7d-aabe-439a2e657c89",
      "f0290853-ee32-41aa-a245-90b33b091860",
      "939bad37-2410-4a0e-85ac-86fc0cad470f",
      "a52a0999-132d-4e0c-9889-b9d73e6ecc55",
      "49306db9-888d-47b7-b601-5667581b31a5",
      "792a87ea-bf4b-421a-a2d6-7c0b7f9a63dc",
      "d442ea9d-db57-43d3-b346-ff0802b5b0d2",
      "56398c14-ba89-4e95-b856-a3e87c5f68c9",
      "32b5276b-12ff-4397-8a0d-bc864294090d",
      "eaad76d1-5ee6-4283-99e0-88ee9c18d59c",
      "1d8652cd-124b-4865-b846-8f9773926bcb",
      "c3365465-0c6d-4b57-97c3-c1c16686302f",
      "794cab5e-88a5-460f-8c79-c69035ffa3ae",
      "34341b9b-8cc6-4a02-8831-99ebc8d03f16",
      "0fdfac1e-2634-4328-b0d0-218d02399531",
      "2db095d7-b725-4e2d-87f6-701c8644316f",
      "b9fadf28-6f18-4555-b162-948f7946eeea",
      "3bd39d7c-dc5f-4e12-846d-79f603a0d129",
      "7b4c0f43-6c84-4263-8a4c-4d0b5bf13de6",
      "e41a2667-5fed-4801-9126-76aabe44da3c",
      "cb96ef3d-278a-4830-a127-0a572d0d2334",
      "e61852c2-b2bf-4a79-a90a-d455015ec87f",
      "afd90926-aeec-4329-90ce-271625924684",
      "a4a12a69-e8bb-410c-877a-2cd47d90584d",
      "708110f4-e498-48c2-8112-fa02ffbada1c",
      "4bcac8a2-2c1e-4e5b-b62f-b976e59870d7",
      "43e61fc8-fc6b-4484-9bd8-01c9519f5146",
      "17f6da85-55e2-41d8-a39c-f9812ef035ae",
      "f96ca811-5c13-4875-9171-efd05da0f752",
      "45a689f7-f586-4fd8-a61a-10de9f83e7c8",
      "ca5532b3-45c5-40bc-a681-c094dc16b544",
      "16cdb95f-189f-4396-8c78-364879e38f48",
      "0ed4e8ef-899d-4516-9e1a-85efdba6916b",
      "016c7fcf-f17d-47d7-9b8a-8c7b88a8de7b",
      "65e960d0-e85a-44a6-9ae6-11a5abf2bdbb",
      "0bac83ac-db49-4f88-8c1d-e38157495331",
      "9a95b5eb-a179-402c-b814-56bd6cb17829",
      "de49ec05-e783-42ef-a906-6cab92fc5ed0",
      "e0589e29-cf68-43e4-89a1-5a2bd202ad93",
      "0759f3f2-3b1f-4faa-867c-9b6d8e247ceb",
      "3906d360-b3bd-4538-ad20-0aa3f9dc17fa",
      "55338cbf-77b3-40d6-a448-b898f003bc28",
      "27e4ca64-f801-441c-a83b-b7683fc22823",
      "82ea3f4c-2d05-43f1-beea-f2ce0adaecb9",
      "6b1880c3-49ec-474e-ba0f-e4311658a4c6",
      "e60975e5-53a4-4ec5-9323-65c59160b75a",
      "11e04b53-ae6d-48ba-b4cf-b20a5f7e2c31",
      "dffc0682-8f8f-4198-a9d6-c23ff31ba7f9",
      "23e7be1d-5df4-495f-943b-b63ee3f2243e",
      "b2c2da10-ec83-40bc-8a13-00fc62a0bf96",
      "796d976e-9bc5-4a7a-bb57-3c8918a00ea7",
      "6c57b254-2fbb-4560-b13d-d0617653ae4b",
      "9ff4fa6f-cee1-40c1-9ece-03d94997a4cd",
    ];

    beforeEach(() => {
      dataSet = JSON.parse(
        readFileSync(resolve(__dirname, "..", "decisions.json"))
      );
    });

    it("iterationUn fonctionne", () => {
      const result = iterationUn(dataSet);
      expect(result).eql(resultExpected);
      expect(result).not.equal(dataSet);
    });

    it("iterationDeux fonctionne", () => {
      const result = iterationDeux(dataSet);
      expect(result).eql(resultExpected);
      expect(result).not.equal(dataSet);
    });

    it("iterationTrois fonctionne", () => {
      const result = iterationTrois(dataSet);
      expect(result).eql(resultExpected);
      expect(result).not.equal(dataSet);
    });

    it("iterationQuatre fonctionne", () => {
      const result = iterationQuatre(dataSet);
      expect(result).eql(resultExpected.length);
      expect(dataSet).eql(resultExpected);
    });
  });

  describe("allSettled", () => {
    it("allSettled a le même resultat que Promise.allSettled", async () => {
      const createPromise = () =>
        new Promise((res, rej) => {
          setTimeout(
            () => (Math.random() < 0.5 ? res(Math.random() < 0.5) : rej()),
            Math.floor(Math.random() * 301)
          );
        });
      const promises = new Array(50).fill(null).map(createPromise);
      const expected = await Promise.allSettled(promises);
      const result = await allSettled(promises);
      expect(result).eql(expected);
    });
  });

  describe("This & Prototype", () => {
    it("réussi à dire son nom", async () => {
      function createCharacter(name) {
        return {
          name,
          introduce: function () {
            return `Hello, I'm ${this.name}`;
          },
        };
      }

      const result = introduceHenri(createCharacter);
      expect(result()).eql("Hello, I'm Henri");
    });
  });
});
