import com.google.gson.annotations.SerializedName

data class Production_countries (
	@SerializedName("iso_3166_1") val iso_3166_1 : String,
	@SerializedName("name") val name : String
)