// La fonction doit prendre en entrée un objet générique et une clé de cet objet
// La fonction ressort la valeur qui correspond à la clé de cet objet
// La fonction doit être correctement typée
export function selectFields<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// La fonction prend en entrée deux objets et sort une combinaison des deux objets
// Les types doivent être explicites
// La fonction ne doit pas pouvoir être appelé avec des objets qui ont des clés en commun
type HasNoCommonKeys<T, U> = keyof T & keyof U extends never ? unknown : never;

export function mergeObjects<T extends object, U extends object>(
  obj1: T,
  obj2: U & HasNoCommonKeys<T, U>
): T & U {
  return { ...obj1, ...obj2 };
}

// La fonction suivante prend en entrée des flags et les traduits en une sortie lisible humainement
// TJ = Tribunal Judiciaire TCOM = Tribunal de Commerce CA = Cour d'Appel CC = Cour de Cassation
// On veut que la fonction fasse une erreur de typage si l'un des flags n'est pas traité 
// (ex: erreur de type s'il existe une possibilité de tomber dans le default d'un switch case)
export function exhaustiveCases(a: "TJ" | "TCOM" | "CA" | "CC"): string {
  switch (a) {
    case "TJ":
      return "Tribunal Judiciaire";
    case "TCOM":
      return "Tribunal de Commerce";
    case "CA":
      return "Cour d'Appel";
    case "CC":
      return "Cour de Cassation";
    default:
      const _exhaustive: never = a;
      return _exhaustive;
  }
}

// Vous trouverez un JSON nommé decisions.json dans le répertoire de test.
// A vous d'écrire le type qui, à votre sens, convient le mieux à cette collection décrie dans ce JSON.
type Decision = {
  _id: string;
  source: string;
  localisation: string;
  text: string;
  dateCreation: string | number;
  dateCration?: string;
  interetParticulier?: boolean | null;
}
export type Decisions = Decision[]

// La fonction prend en entrée un unknown (l'objet correspondant au JSON: decisions.json) et doit permettre,
// grâce à typescript, de vérifier que cet unknown est bien du type Decisions. La fonction retourne un boolean.
export function typeSafe(x: unknown): x is Decisions {
  if (!Array.isArray(x)) {
    return false;
  }

  return x.every((item): item is Decision => {
    if (typeof item !== "object" || item === null) {
      return false;
    }

    const obj = item as Record<string, unknown>;

    const hasValidDateCreation =
      typeof obj.dateCreation === "string" ||
      typeof obj.dateCreation === "number" ||
      typeof obj.dateCration === "string" ||
      typeof obj.dateCration === "number";

    const hasValidInteretParticulier =
      obj.interetParticulier === undefined ||
      obj.interetParticulier === null ||
      typeof obj.interetParticulier === "boolean";

    return (
      typeof obj._id === "string" &&
      typeof obj.source === "string" &&
      typeof obj.localisation === "string" &&
      typeof obj.text === "string" &&
      hasValidDateCreation &&
      hasValidInteretParticulier
    );
  });
}