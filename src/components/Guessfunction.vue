<template>
    <div class="counter">
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
        count() {
            return this.$store.state.count;
        }
    },
    methods: {
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

