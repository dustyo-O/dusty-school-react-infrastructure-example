export function smallestCommonMultiple(numberA: number, numberB: number) {
    let bigger;
    let smaller;

    if (numberA > numberB) {
        bigger = numberA;
        smaller = numberB;
    } else {
        bigger = numberB;
        smaller = numberA;
    }

    let i = 1;

    let nok = bigger;
    while(nok % smaller !== 0) {
        i += 1;

        nok = bigger * i;
    }

    return nok;
}
