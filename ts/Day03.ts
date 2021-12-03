function p1(input: string[]): number {
    
    const inputLength = input.length;
    const sampleSize = input[0].length;

    // index = bit position, value @ index = count of `1` bits
    let bitCount: number[] = countBitValuesAtIndex(`1`, input);

    let gammaRate: string = ``;
    let epsilonRate: string = ``;

    for (let i = 0; i < sampleSize; i++) {
        if (bitCount[i] > inputLength / 2) {
            gammaRate += `1`;
            epsilonRate += `0`;
        } else {
            gammaRate += `0`;
            epsilonRate += `1`;
        }
    }
    
    return byteStringToDec(gammaRate) * byteStringToDec(epsilonRate); 
}

function countBitValuesAtIndex(bitValue: string, input: string[]): number[] {
    
    const inputLength = input.length;
    const sampleSize = input[0].length;

    let bitCount: number[] = new Array(sampleSize).fill(0);

    for (let i = 0; i < inputLength; i++) {
        for (let j = 0; j < sampleSize; j++) {
            if (input[i][j] == bitValue) {
                bitCount[j]++;
            }
        }
    }

    return bitCount;
}

function p2(input: string[]): number {

    let co2ScrubberRating = getC02ScrubberRate(JSON.parse(JSON.stringify(input)));
    let o2GenRating = getO2GeneratorRate(JSON.parse(JSON.stringify(input)));

    return co2ScrubberRating * o2GenRating;
}

function getC02ScrubberRate(input: string[]): number {
    
    for (let i = 0; i < input[0].length; i++) {

        let zeroCount = input.filter(r => r.charAt(i) == `0`);
        let oneCount = input.filter(r => r.charAt(i) == `1`);
      
        input = (zeroCount.length > oneCount.length) ? oneCount : zeroCount;

        if (input.length == 1) {
            return byteStringToDec(input[0]);
        }
    }

    return 0;
}

function getO2GeneratorRate(input: string[]): number {
    
    for (let i = 0; i < input[0].length; i++) {

        let zeroCount = input.filter(r => r.charAt(i) == `0`);
        let oneCount = input.filter(r => r.charAt(i) == `1`);
      
        input = (zeroCount.length > oneCount.length) ? zeroCount : oneCount;

        if (input.length == 1) {
            return byteStringToDec(input[0]);
        }
    }

    return 0;
}

function byteStringToDec(byteString: string): number {
    
    let num = 0;
    const size = byteString.length - 1;

    for (let i = size; i >= 0; i--) {
        if (byteString[i] == `1`) {
            num += Math.pow(2, size - i);            
        }
    }

    return num;
}
