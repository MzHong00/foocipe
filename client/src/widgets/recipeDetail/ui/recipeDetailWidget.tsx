import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiCalendarLine } from "@react-icons/all-files/ri/RiCalendarLine";

import { IconBox } from "shared/ui/iconBox";
import { IRecipe } from "shared/api/recipe/type";
import { PicturesBox } from "shared/ui/picturesBox";
import { INGREDIENTS_CATEGORIES } from "entities/ingredient";
import { LikeButton } from "features/recipe/like";

import styles from "./recipeDetailWidget.module.scss";

interface Props {
  recipe: IRecipe;
}

export const RecipeDetailWidget = ({ recipe, ...props }: Props) => {
  const {
    _id,
    name,
    pictures,
    ingredients,
    introduction,
    servings,
    cooking_time,
    created_at,
    like_members,
  } = recipe;

  return (
    <article className={styles.container} {...props}>
      <PicturesBox pictures={pictures} />

      <div className={styles.infoBox}>
        <div className={styles.recipeInfoBar}>
          <div className={styles.infoHeader}>{name && <b>{name}</b>}</div>

          {like_members && (
            <div className="flex-row">
              {like_members && _id && (
                <LikeButton recipe_id={_id} likeMembers={like_members} />
              )}
            </div>
          )}

          <div className={styles.subInfo}>
            {!!cooking_time && (
              <IconBox Icon={RiTimer2Line}>조리시간 {cooking_time}분</IconBox>
            )}
            {!!servings && <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>}
            {created_at && (
              <IconBox Icon={RiCalendarLine}>
                {`${created_at.toString().substring(0, 10)}`}
              </IconBox>
            )}
          </div>
          {introduction && <p>{introduction}</p>}
        </div>
        {ingredients && (
          <ul className={styles.ingredientList}>
            {ingredients.map((ingredient) => (
              <li key={ingredient.name} className={styles.ingredient}>
                {
                  INGREDIENTS_CATEGORIES.find(
                    (cate) => cate.text === ingredient.category
                  )?.emoji
                }
                {ingredient.name} {ingredient.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};