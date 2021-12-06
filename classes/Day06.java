import java.util.Arrays;

public class Day06 {

    public long p1(int[] input) {
        return getFishCountForDays(input, 80);
    }

    public long p2(int[] input) {
        return getFishCountForDays(input, 256);
    }

    private long getFishCountForDays(int [] input, int days) {

        long[] fishReproductionCycle = new long[9];
        for (int i = 0 ; i <= 8; i++) {
            fishReproductionCycle[i] = 0;
        }
        for (int j : input) {
            fishReproductionCycle[j]++;
        }

        for (int day = 1 ; day <= days; day++) {
            long newAndResettingFish = fishReproductionCycle[0];

            for (int count = 0; count <= 7; count++) {
                // make fish older
                fishReproductionCycle[count] = fishReproductionCycle[count + 1];
                if (count == 6) {
                    fishReproductionCycle[count] += newAndResettingFish;
                }
            }
            fishReproductionCycle[8] = newAndResettingFish;
        }

        return Arrays.stream(fishReproductionCycle).sum();
    }
}
