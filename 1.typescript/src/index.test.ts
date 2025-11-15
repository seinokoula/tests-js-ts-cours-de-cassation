import { readFile } from "fs/promises";
import { Decisions, mergeObjects, selectFields, typeSafe } from "./index";
import { resolve } from "path";

describe("Typescript", () => {
    describe("SelectFields", () => {
        const objectA = { a: 1, b: 2 }
        const objectB = { a: "1", b: "2" }

        it("fonctionne pour les nombres", () => {
            const result: number = selectFields(objectA, "a")
            expect(result).toEqual(objectA.a)
        })

        it("fonctionne pour les string", () => {
            const result: string = selectFields(objectB, "a")
            expect(result).toEqual(objectB.a)
        })

        it("le type échoue si la clé n'existe pas", () => {
            // @ts-expect-error
            const result = selectFields(objectA, "c")
            expect(result).toEqual(undefined)
        })

        it("le type échoue si la valeur ne correspond pas", () => {
            // @ts-expect-error
            const result: string = selectFields(objectA, "b")
            expect(result).toEqual(2)
        })
    })
    describe("mergeObjects", () => {
        const objectA = { a: 1, b: 2 }
        const objectB = { c: "1", d: "2" }
        const objectC = { a: "1", b: "2" }

        it("fonctionne avec A et B", () => {
            const result = mergeObjects(objectA, objectB)
            expect(result).toEqual({ ...objectA, ...objectB })
        })

        it("fonctionne avec B et C", () => {
            const result = mergeObjects(objectB, objectC)
            expect(result).toEqual({ ...objectB, ...objectC })
        })

        it("échoue avec A et C", () => {
            // @ts-expect-error
            const result = mergeObjects(objectA, objectC)
            expect(result).toEqual(objectC)
        })
    })
    describe("typing Decision & typesafe", () => {
        it("permet de typer decisions", async () => {
            const decisionFile = await readFile(resolve(__dirname, "..", "..", "decisions.json"), "utf8")
            const decisions: unknown = JSON.parse(decisionFile)
            function getDecisions(x: Decisions) { return true }

            expect(typeSafe(decisions)).toEqual(true)
            if (typeSafe(decisions)) getDecisions(decisions)
        })
    })
});