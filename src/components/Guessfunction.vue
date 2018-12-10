<template>
    <div id="brain">
        <p> Guess the number homie </p>
        <input type='number'  v-model="number">
        <button @click="testNumber()" > Submit Number</button>

        <span>
            {{ randomNumber() }}
        </span>
     </div>

</template>



<script>
export default {
    name: 'Guessfunction',
    data() {
        return {
            number: 0
        }
        
    },
    methods: {
        randomNumber: function () {
            return Math.floor(Math.random() * (10 - 1 + 1)) + 1;

        },
        
    }
    
}





</script>


<style scoped>

p{
    color: midnightblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}


</style>

