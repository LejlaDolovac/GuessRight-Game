<template>
<div class="brain">
        <p> Guess the number homie </p>
        <input type='number'  v-model="number" ref="submitNumber">
        <!--<button @click="testNumber()" > Submit Number</button>-->

        <span ref="randomNum">
            {{ randomNumber() }}
        </span>
        <div class="counter_buttons">
            <button class="button_counter_increment" @click="randomNumber()">Random</button>
            <button class="button_counter_testing" @click="testingNumbers()">Test</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Guessfunction',
    computed: {
        data() {
            return {
                number: 0
            } 
        }
    },
    methods: {
        randomNumber: function () {
            this.$store.state.number = Math.floor(Math.random() * (10 - 1 + 1)) + 1
            return this.$store.state.number;
        },
        increment() {
            this.$store.commit('increment')
        },
        decrement() {
            this.$store.commit('decrement')
        },
        testingNumbers() {
            if(this.$store.state.number == this.$refs.submitNumber.value) {
                alert("Right!")
                this.randomNumber()
            } else {
                if (this.$store.state.number >= this.$refs.submitNumber.value){
                alert("Wrong! Higher, dude")
                } else {
                    alert("Wrong! Lower, dude")
                }

            }
        }
    },
}
</script>

<style scoped>

p{
    color: midnightblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}

</style>