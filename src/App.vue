<template>
  <div class="min-h-screen bg-white">
    <Header @add-recipe="showAddModal = true" />

    <!-- View Toggle & Filter Section -->
    <section class="max-w-7xl mx-auto px-4 py-4">
      <ViewToggle
        :current-view="currentView"
        @change-view="currentView = $event"
        :upcoming-count="upcomingCount"
      />
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-6">
      <GalleryView
        v-if="currentView === 'gallery'"
        :recipes="filteredRecipes"
        :filters="filters"
        @edit-recipe="editRecipe"
        @view-recipe="viewRecipe"
        @filter-by-tag="filterByTag"
      />

      <TimelineView
        v-else
        :recipes="plannedRecipes"
        @view-recipe="viewRecipe"
      />

      <EmptyState
        v-if="recipes.length === 0"
        @add-recipe="showAddModal = true"
      />
      <NoResultsState v-else-if="filteredRecipes.length === 0" />
    </main>

    <!-- Modals -->
    <RecipeModal
      v-if="showAddModal"
      :recipe="editingRecipe"
      @close="closeRecipeModal"
      @save="saveRecipe"
    />

    <ViewRecipeModal
      v-if="showViewModal && viewingRecipe"
      :recipe="viewingRecipe"
      @close="showViewModal = false"
      @edit="editRecipe"
      @delete="deleteRecipe"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Header from "./components/Header.vue";
import ViewToggle from "./components/ViewToggle.vue";
import GalleryView from "./components/GalleryView.vue";
import TimelineView from "./components/TimelineView.vue";
import RecipeModal from "./components/RecipeModal.vue";
import ViewRecipeModal from "./components/ViewRecipeModal.vue";
import EmptyState from "./components/EmptyState.vue";
import NoResultsState from "./components/NoResultsState.vue";
import { useRecipes } from "./composables/useRecipes";
import { useAiSettings } from "./composables/useAiSettings";

const {
  recipes,
  addRecipe,
  updateRecipe,
  deleteRecipe: deleteRecipeFromStore,
  loadRecipes,
} = useRecipes();
const aiStore = useAiSettings();

const currentView = ref<"gallery" | "timeline">("gallery");
const searchQuery = ref("");
const showAddModal = ref(false);
const showViewModal = ref(false);
const editingRecipe = ref<any>(null);
const viewingRecipe = ref<any>(null);
const filters = ref(new Set<string>());

onMounted(() => {
  loadRecipes();
});

const filteredRecipes = computed(() => {
  return recipes.value.filter((recipe) => {
    const matchesTag =
      filters.value.size === 0 ||
      recipe.tags.some((tag) => filters.value.has(tag));
    const matchesSearch =
      !searchQuery.value ||
      recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      recipe.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      recipe.author.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      recipe.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.value.toLowerCase()),
      );
    return matchesTag && matchesSearch;
  });
});

const plannedRecipes = computed(() => {
  return recipes.value
    .filter((r) => r.plannedDate)
    .filter((r) => {
      if (!searchQuery.value) return true;
      return (
        r.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        r.author.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        r.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.value.toLowerCase()),
        )
      );
    })
    .sort((a, b) => a.plannedDate!.localeCompare(b.plannedDate!));
});

const upcomingCount = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return recipes.value.filter((r) => r.plannedDate && r.plannedDate >= today)
    .length;
});

const setView = (view: "gallery" | "timeline") => {
  currentView.value = view;
};

const filterByTag = (tag) => {
  if (tag === null) {
    filters.value.clear();
  } else {
    if (filters.value.has(tag)) {
      filters.value.delete(tag);
    } else {
      filters.value.add(tag);
    }
  }
};

const editRecipe = (recipe: any) => {
  editingRecipe.value = recipe;
  showAddModal.value = true;
};

const saveRecipe = async (recipe) => {
  if (recipe.id) {
    await updateRecipe(recipe);
  } else {
    await addRecipe(recipe);
  }
  showAddModal.value = false;
  editingRecipe.value = null;
};

const closeRecipeModal = () => {
  showAddModal.value = false;
  editingRecipe.value = null;
};

const viewRecipe = (recipe: any) => {
  viewingRecipe.value = recipe;
  showViewModal.value = true;
};

const deleteRecipe = async (id: string) => {
  if (confirm("Are you sure you want to delete this recipe?")) {
    await deleteRecipeFromStore(id);
    showViewModal.value = false;
  }
};
</script>