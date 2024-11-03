import vine from "@vinejs/vine";

export const resourceValidatorSchema = vine.object({
    resourceName: vine.string().minLength(3).maxLength(100),
    description: vine.string().minLength(3).maxLength(1000),
    image: vine.any(),
    url: vine.any(),
    imageCredit: vine.string().minLength(3).maxLength(1000),
})