<template>
  <div class="max-w-3xl mx-auto">
    <div v-if="groupedRecipes.today.length > 0" class="mb-8">
      <TimelineSection
        title="🍳 Today"
        :recipes="groupedRecipes.today"
        type="today"
        @view="emit('view-recipe', $event)"
      />
    </div>

    <div v-if="groupedRecipes.tomorrow.length > 0" class="mb-8">
      <TimelineSection
        title="Tomorrow"
        :recipes="groupedRecipes.tomorrow"
        type="upcoming"
        @view="emit('view-recipe', $event)"
      />
    </div>

    <div v-if="groupedRecipes.thisWeek.length > 0" class="mb-8">
      <TimelineSection
        title="This Week"
        :recipes="groupedRecipes.thisWeek"
        type="upcoming"
        @view="emit('view-recipe', $event)"
      />
    </div>

    <div v-if="groupedRecipes.later.length > 0" class="mb-8">
      <TimelineSection
        title="Coming Up"
        :recipes="groupedRecipes.later"
        type="upcoming"
        @view="emit('view-recipe', $event)"
      />
    </div>

    <div v-if="groupedRecipes.past.length > 0" class="mt-8">
      <button
        @click="showPast = !showPast"
        class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
      >
        <svg
          :style="{ transform: showPast ? 'rotate(90deg)' : 'rotate(0deg)' }"
          class="w-4 h-4 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span class="text-sm font-medium"
          >Past ({{ groupedRecipes.past.length }})</span
        >
      </button>
      <div v-if="showPast">
        <TimelineSection
          title=""
          :recipes="groupedRecipes.past"
          type="past"
          @view="emit('view-recipe', $event)"
        />
      </div>
    </div>

    <div v-if="recipes.length === 0" class="text-center py-16">
      <div
        class="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-lg flex items-center justify-center"
      >
        <svg
          class="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        No planned recipes
      </h3>
      <p class="text-gray-600">
        Set a "Plan to Cook" date to see recipes here.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TimelineSection from "./TimelineSection.vue";
import { getTodayDate } from "../utils/dateUtils";

const props = defineProps({
  recipes: Array
});

const emit = defineEmits({
  'view-recipe': {}
});

const showPast = ref(false);

const groupedRecipes = computed(() => {
  const today = getTodayDate();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const thisWeekEnd = new Date();
  thisWeekEnd.setDate(thisWeekEnd.getDate() + 7);
  const thisWeekEndStr = thisWeekEnd.toISOString().split("T")[0];

  const todayRecipes = props.recipes.filter((r) => r.plannedDate === today);
  const upcomingRecipes = props.recipes.filter(
    (r) => r.plannedDate && r.plannedDate > today,
  );
  const pastRecipes = props.recipes
    .filter((r) => r.plannedDate && r.plannedDate < today)
    .reverse();

  return {
    today: todayRecipes,
    tomorrow: upcomingRecipes.filter((r) => r.plannedDate === tomorrowStr),
    thisWeek: upcomingRecipes.filter(
      (r) => r.plannedDate > tomorrowStr && r.plannedDate <= thisWeekEndStr,
    ),
    later: upcomingRecipes.filter((r) => r.plannedDate > thisWeekEndStr),
    past: pastRecipes,
  };
});
</script>
