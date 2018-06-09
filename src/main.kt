fun main(args: Array<String>) {
    radioCheck(arrayOf(1, 2, 3, 4, 5), 1, 2)
//    radioCheck(arrayOf(7, 2, 4, 6, 5, 9, 12, 11), 2, 3)
//    radioCheck(arrayOf(7, 2, 2, 4, 4, 6, 5, 9, 12, 11, 7), 2, 3)
//    radioCheck(arrayOf(7, 2, 4, 6, 5, 9, 12, 11), 100000, 1)
//    radioCheck(arrayOf(1, 7, 9), 5, 2)
//    radioCheck(arrayOf(3, 3, 3), 3, 1)
//    radioCheck(arrayOf(3, 3, 3), 1, 1)
//    radioCheck(arrayOf(1, 30, 61), 31, 1)
//    radioCheck(arrayOf(1), 31, 1)
//    radioCheck(arrayOf(1, 30, 60), 1, 3)
}


fun radioCheck(houses: Array<Int>, range: Int, result: Int) {
    val calcResult = hackerlandRadioTransmitters(houses, range)
    val check = if (calcResult == result) "OK" else "Not passed!"
    println("Houses: ${houses.joinToString()}, range: $range, result: $calcResult, $check")
}

fun hackerlandRadioTransmitters(x: Array<Int>, k: Int): Int {
    val houses = x.distinct()
            .sorted()
//    return RangeCalc(k).calc(houses).result
    return radioCalc(houses, k)
}

class RangeCalc(val oneWayRange: Int) {
    var result = 0
    private val range = oneWayRange * 2 + 1
    private var firstN: Int? = null
    private var sum: Int = 0

    private var pushed: Int = 0

    fun calc(houses: List<Int>): RangeCalc {
        for ((i, next) in houses.withIndex()) {
            if (firstN == null) {
                firstN = next
            }
            val delta = next - firstN!!
            sum += delta
            pushed++
            if (sum >= range || delta > oneWayRange) {
                result++
                firstN = next
                sum = 0
                pushed = 0
            }
            if (pushed > 0 && i == houses.size - 1) {
                result++
            }
        }

        return this
    }

}


fun radioCalc(houses: List<Int>, oneWayRange: Int): Int {
    if (houses.size == 1) return 1
    var result = 0
    var i = 0

    var sum = 0
    var offset = 0
    while (i < houses.size) {

    }
    return result
}