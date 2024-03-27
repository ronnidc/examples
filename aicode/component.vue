<template>
	<div class="container" :class="{ 'flip': flip }">
	  <div class="content">
		<h2 v-if="title">{{ title }}</h2>
		<p v-if="text">{{ text }}</p>
		<div class="buttons">
		  <button v-if="buttons && buttons.length" v-for="(button, index) in buttons" :key="index" class="button">
			{{ button }}
		  </button>
		</div>
	  </div>
	  <div class="image">
		<img v-if="imageSrc" :src="imageSrc" :alt="imageAlt">
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	name: 'ContentComponent',
	props: {
	  title: {
		type: String,
		default: ''
	  },
	  text: {
		type: String,
		default: ''
	  },
	  buttons: {
		type: Array,
		default: () => []
	  },
	  flip: {
		type: Boolean,
		default: false
	  },
	  imageSrc: {
		type: String,
		default: ''
	  },
	  imageAlt: {
		type: String,
		default: ''
	  }
	}
  }
  </script>
  
  <style scoped>
  /* Styles remain the same */
  </style>