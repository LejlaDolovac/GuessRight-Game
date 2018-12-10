<template>
<div class="brain">
        <p> Guess the number homie </p>
        <input type='number'  v-model="number">
        <button @click="testNumber()" > Submit Number</button>

        <span>
            {{ randomNumber() }}
        </span>
        <p class="counte_display">
            {{ count }}
        </p>
        <div class="counter_buttons">
            <button class="button_counter_increment" @click="increment">Plus</button>
            <button class="button_counter_decrement" @click="decrement">Minus</button>
            <button class="button_counter_testing" @click="testingNumbers">Test</button>
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
            
        },
        count() {
            return this.$store.state.count;
        }
    },
    methods: {
        randomNumber: function () {
            return Math.floor(Math.random() * (10 - 1 + 1)) + 1;

        },
        increment() {
            this.$store.commit('increment')
        },
        decrement() {
            this.$store.commit('decrement')
        },
        testingNumbers() {
            if(this.$store.state.number == this.count) {
                alert("Whaaaa!")
            } else {
                alert("Whööööö!")
            }
        }
    }
}
</script>

<style scoped>

p{
    color: midnightblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}

</style>